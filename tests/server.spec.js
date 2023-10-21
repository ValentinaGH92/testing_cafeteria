const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("deberia devolver status 200", async () => {
    const response = await request(server).get("/cafes");

    expect(response.statusCode).toBe(200);
  });

  it("deberia devolver un arreglo con cafes", async () => {
    const response = await request(server).get("/cafes");

    expect(response.body).toBeDefined();
    expect(response.body.length).not.toBe(0);
  });

  it("deberia obtener un 404 al eliminar un cafe un id que no existe", async () => {
    const response = await request(server)
      .delete("/cafes/8")
      .set("Authorization", "Bearer jwt");

    expect(response.statusCode).toBe(404);
  });

  it("deberia agregar un nuevo cafe y devolver status 201", async () => {
    const response = await request(server)
      .post("/cafes")
      .set("body", { nombre: "vainilla veggie" });

    expect(response.statusCode).toBe(201);
  });

  it("deberia devolver status 400 al actualizar un id que sea diferente de los params al queryparams ", async () => {
    const response = await request(server)
      .put("/cafes/2")
      .set("body", { id: 3, nombre: "vainilla veggie" });

    expect(response.statusCode).toBe(400);
  });
});
