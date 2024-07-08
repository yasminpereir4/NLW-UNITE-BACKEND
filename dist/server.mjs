import {
  registerForEvent
} from "./chunk-4PWOVD33.mjs";
import {
  errorHandler
} from "./chunk-FST3HASH.mjs";
import {
  checkIn
} from "./chunk-A6A5AC2I.mjs";
import {
  createEvent
} from "./chunk-4AZ3HEEA.mjs";
import "./chunk-J4AHKJY7.mjs";
import {
  getAttendeeBadge
} from "./chunk-FXTWURBX.mjs";
import {
  getEventAttendees
} from "./chunk-3ZZIVLTJ.mjs";
import {
  getEvent
} from "./chunk-Y7ACW3UO.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o backend da aplica\xE7\xE3o pass.in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP SERVER RUNNING");
});
export {
  app
};
