import { fakerPT_BR as faker } from "@faker-js/faker";

describe("fluxo venda", () => {
  it("cliente-compra", () => {
    cy.visit("http://localhost:3000");
    cy.get("button[data-test=login]").first().click();
    cy.get("input[name=email]").type("Meire90@live.com");
    cy.get("button[data-test=login]").first().click();
    cy.get("button[data-test=add-item]").first().click();
    cy.get("button[data-test=remove-item]").first().click();
    cy.get("button[data-test=add-item]").first().click();
    cy.get("button[data-test=add-carrinho]").first().click();
    cy.get("button[data-test=carrinho]").first().click();
    cy.get("button[data-test=add-item]").first().click();
    cy.get("button[data-test=remove-item]").first().click();
    cy.get("button[data-test=cart]").first().click();
    cy.get("button[data-test=criar-cartao]").click();

    //

    cy.get('input[name="cartao.0.num"]').type(
      faker.number.int({
        min: 1000000000000000,
        max: 9999999999999999,
      })
    );
    cy.get('input[name="cartao.0.cvc"]').type(
      faker.number.int({
        min: 100,
        max: 999,
      })
    );
    cy.get('select[name="cartao.0.bandeira"]').select("Elo");
    cy.get('input[name="cartao.0.nome"]').type(faker.person.fullName());
    cy.get('input[name="cartao.0.validade"]').type("1025");
    cy.get("input[id=credito]").click();
    cy.get("button[data-test=criar_card]").first().click();

    //

    cy.get("input[name=cartaoCredito]").first().click();
    cy.get("input[name=cartaoCredito]").last().click();
    cy.get('input[data-test="preco"]').first().type("15");
    cy.get('input[data-test="preco"]').last().type("164,8");
    cy.get("input[data-test=endereco]").first().click();
    cy.get("button[data-test=finalizar]").first().click();
    cy.get("button[data-test=compras").click();
  });
  it("admin-venda", () => {
    cy.visit("http://localhost:3000/Admin/Vendas");
    cy.get('select[data-test="status"]').last().select("Entregue");
  });
  it("cliente-troca", () => {
    cy.visit("http://localhost:3000");
    cy.get("button[data-test=login]").first().click();
    cy.get("input[name=email]").type("example@example.com");
    cy.get("button[data-test=login]").first().click();
    cy.get("button[data-test=compras").click();
    cy.get("input[data-test=item]").last().click();
    cy.get('input[data-test="quant-preco"]').last().type("2");
    cy.get("button[data-test=reembolso]").click();
  });
  it("troca-admin", () => {
    cy.visit("http://localhost:3000/Admin/Troca");
    cy.get('select[data-test="status-troca"]').last().select("Troca_Realizada");
    cy.get("button[data-test=cupom]").last().click();
  });
  it("cliente-compra-cupom", () => {
    cy.visit("http://localhost:3000");
    cy.get("button[data-test=login]").first().click();
    cy.get("input[name=email]").type("example@example.com");
    cy.get("button[data-test=login]").first().click();
    cy.get("button[data-test=add-item]").last().click();
    cy.get("button[data-test=remove-item]").last().click();
    cy.get("button[data-test=add-item]").last().click();
    cy.get("button[data-test=add-carrinho]").last().click();
    cy.get("button[data-test=carrinho]").first().click();
    cy.get("button[data-test=add-item]").first().click();
    cy.get("button[data-test=remove-item]").first().click();
    cy.get("button[data-test=cart]").first().click();
    cy.get('input[data-test="cupom-code"]').type("CUPOM1733000371779");
    cy.get("button[data-test=aplicar-cupom]").click();
    cy.get("input[name=cartaoCredito]").first().click();
    cy.get("input[name=cartaoCredito]").last().click();
    cy.get('input[data-test="preco"]').first().type("15");
    cy.get('input[data-test="preco"]').last().type("64,8");
    cy.get("input[data-test=endereco]").first().click();
    cy.get("button[data-test=finalizar]").first().click();
  });
});
