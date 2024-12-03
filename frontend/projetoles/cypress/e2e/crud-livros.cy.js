import { fakerPT_BR as faker } from "@faker-js/faker";

const formatDateForInput = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  return `${year}`;
};

describe("crud livro", () => {
  it("cadastrar", () => {
    cy.visit("http://localhost:3000/Admin/Livros");
    cy.get("input[name=lvr_atr]").type(faker.person.fullName());
    cy.get("input[name=lvr_ttl]").type("Fake Tittle");
    cy.get("input[name='lvr_ISBN']").type("978" + faker.string.numeric(10));

    cy.get("input[name=lvr_ano]").type(
      formatDateForInput(faker.date.past({ years: 40 }).toISOString())
    );
    cy.get('input[name="lvr_num_pag"]').type(
      faker.number.int({
        min: 100,
        max: 500,
      })
    );
    cy.get('textarea[name="lvr_snp"]').type("Fake Sinopse");
    cy.get("input[name=lvr_alt]").type(
      faker.number
        .float({
          min: 10,
          max: 30,
        })
        .toFixed(2)
    );
    cy.get("input[name=lvr_lar]").type(
      faker.number
        .float({
          min: 10,
          max: 30,
        })
        .toFixed(2)
    );
    cy.get("input[name=lvr_pes]").type(
      faker.number
        .float({
          min: 0,
          max: 5,
        })
        .toFixed(2)
    );
    cy.get("input[name=lvr_prf]").type(
      faker.number
        .float({
          min: 0,
          max: 10,
        })
        .toFixed(2)
    );
    cy.get('select[name="lvr_stt"]').select("ATIVADO");
    cy.get("input[name=lvr_prc]").type(
      faker.number
        .int({
          min: 50,
          max: 100,
        })
        .toFixed(2)
    );
    cy.get("input[name='lvr_cod_brr']").type("978" + faker.string.numeric(10));

    cy.get("input[name=lvr_qnt]").type(
      faker.number.int({
        min: 10,
        max: 30,
      })
    );
    cy.get('select[name="lvr_cat"]').select("Poesia");
    cy.get("button[data-test=criar-livro]").click();
  });

  it("update", () => {
    cy.visit("http://localhost:3000/Admin/Livros");
    cy.get("button[data-test=editar-livro]").last().click();
    cy.get("input[data-test=atr_edt]").clear().type(faker.person.fullName());
    cy.get("input[data-test=ttl_edt]").clear().type("Fake do Fake Tittle");
    cy.get("input[data-test=ISBN_edt]")
      .clear()
      .type("978" + faker.string.numeric(10));

    cy.get("input[data-test=ano_edt]")
      .clear()
      .type(formatDateForInput(faker.date.past({ years: 40 }).toISOString()));
    cy.get("input[data-test=num_pag_edt]")
      .clear()
      .type(
        faker.number.int({
          min: 100,
          max: 500,
        })
      );
    cy.get("textarea[data-test=snp_edt]").clear().type("Fake do Fake Sinopse");
    cy.get("input[data-test=alt_edt]")
      .clear()
      .type(
        faker.number
          .float({
            min: 10,
            max: 30,
          })
          .toFixed(2)
      );
    cy.get("input[data-test=lar_edt]")
      .clear()
      .type(
        faker.number
          .float({
            min: 10,
            max: 30,
          })
          .toFixed(2)
      );
    cy.get("input[data-test=pes_edt]")
      .clear()
      .type(
        faker.number
          .float({
            min: 0,
            max: 5,
          })
          .toFixed(2)
      );
    cy.get("input[data-test=prf_edt]")
      .clear()
      .type(
        faker.number
          .float({
            min: 0,
            max: 10,
          })
          .toFixed(2)
      );
    cy.get("select[data-test=stt_edt]").select("DESATIVADO");
    cy.get("input[data-test=prc_edt]")
      .clear()
      .type(
        faker.number
          .int({
            min: 50,
            max: 100,
          })
          .toFixed(2)
      );
    cy.get("input[data-test=cod_brr_edt]")
      .clear()
      .type("978" + faker.string.numeric(10));

    cy.get("input[data-test=qnt_edt]")
      .clear()
      .type(
        faker.number.int({
          min: 10,
          max: 30,
        })
      );
    cy.get("select[data-test=cat_edt]").select("Poesia");
    cy.get("button[data-test=atualizar-button]").click();
  });
  it("delete", () => {
    cy.visit("http://localhost:3000/Admin/Livros");
    cy.get("button[data-test=delete-livro]").last().click();
  });
});
