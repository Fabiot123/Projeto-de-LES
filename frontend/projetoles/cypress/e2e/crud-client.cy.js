import { fakerPT_BR as faker } from "@faker-js/faker";

const formatDateForInput = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adiciona zero se o mês for de um dígito
  const day = String(date.getDate()).padStart(2, "0"); // Adiciona zero se o dia for de um dígito
  return `${year}-${month}-${day}`;
};

describe("crud cliente", () => {
  it("registrar", () => {
    cy.visit("http://localhost:3000/CadastroCliente");
    //dados pessoais
    cy.get("input[name=name]").type(faker.person.fullName());
    cy.get("input[name=cpf]").type(
      faker.number.int({
        min: 10000000000,
        max: 99999999999,
      })
    );
    cy.get('input[name="tel.ddd"]').type(
      faker.number.int({
        min: 10,
        max: 99,
      })
    );
    cy.get("select[name=gender]").select("Masculino");
    cy.get('select[name="tel.tipo"]').select("Fixo");
    cy.get('input[name="tel.numero"]').type(
      faker.number.int({
        min: 10000000000,
        max: 99999999999,
      })
    );
    cy.get("input[name=dt_nascimento]").type(
      formatDateForInput(faker.date.past({ years: 60 }).toISOString())
    );
    cy.get("input[name=senha]").type("Senha123@");
    cy.get("input[name=confsenha]").type("Senha123@");
    cy.get("input[name=email]").type(faker.internet.email());
    //endereco
    cy.get("input[id=residencia]").click();
    cy.get("input[id=cobranca]").click();
    cy.get("input[id=entrega]").click();
    cy.get('select[name="endereco.[0].resi"]').select("Casa");
    cy.get('select[name="endereco.[0].tlogra"]').select("Publico");
    cy.get('input[name="endereco.[0].num"]').type(
      faker.number.int({
        min: 10,
        max: 999,
      })
    );
    cy.get('input[name="endereco.[0].logra"]').type(faker.location.street());
    cy.get('input[name="endereco.[0].cep"]').type(faker.location.zipCode());
    cy.get('input[name="endereco.[0].bairro"]').type("Alto do Ipiranga");
    cy.get('input[name="endereco.[0].cidade"]').type("Mogi das Cruzes");
    cy.get('input[name="endereco.[0].estado"]').type("SP");
    cy.get('input[name="endereco.[0].pais"]').type("Brasil");
    //cartao
    cy.get('input[name="cartao.[0].num"]').type(
      faker.number.int({
        min: 1000000000000,
        max: 9999999999999,
      })
    );
    cy.get('input[name="cartao.[0].cvc"]').type(
      faker.number.int({
        min: 100,
        max: 999,
      })
    );
    cy.get('select[name="cartao.[0].bandeira"]').select("Elo");
    cy.get('input[name="cartao.[0].nome"]').type(faker.person.fullName());
    cy.get('input[name="cartao.[0].validade"]').type("1025");
    cy.get("input[id=credito]").click();
    cy.get("button[id=criar]").click();
  });

  it("update", () => {
    cy.visit("http://localhost:3000/Admin/Users");
    cy.get("a[data-test=update-button]").first().click();
    cy.get('input[name="endereco.[0].logra"]')
      .clear()
      .type(faker.location.street());
    cy.get('select[name="tel.tipo"]').select("Fixo");
    cy.get('input[name="tel.ddd"]').type(
      faker.number.int({
        min: 10,
        max: 99,
      })
    );
    cy.get('input[name="tel.numero"]').type(
      faker.number.int({
        min: 10000000000,
        max: 99999999999,
      })
    );
    cy.get("input[name=name]").clear().type(faker.person.fullName());
    cy.get("button[id=criar]").click();
  });

  it("delete", () => {
    cy.visit("http://localhost:3000/Admin/Users");
    cy.get("button[data-test=delete-button]").first().click();
  });
});
