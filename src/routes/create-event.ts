import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { generateSlug } from "../utils/generate-slug";
import { BadRequest } from "./_errors/bad-request";

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events",
    {
      schema: {
        summary: "Create an event",
        tags: ["events"],
        body: z.object({
          title: z
            .string({ invalid_type_error: "O titulo precisa ser um texto." })
            .min(4),
          details: z.string().nullable(),
          maximumAttendes: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendes } = request.body;

      const slug = generateSlug(title);

      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug,
        },
      });

      if (eventWithSameSlug !== null) {
        throw new BadRequest(
          "Another event with the same title already exists.",
        );
      }

      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendes,
          slug,
        },
      });

      // return ;
      return reply.status(201).send({ eventId: event.id });
    },
  );
}
