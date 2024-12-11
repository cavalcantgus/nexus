<template>
  <NavBar></NavBar>
  <v-main>
    <div class="container">
      <!-- Primeiro card (verde) -->
      <v-card class="card-first" color="#1C4053">
        <div class="green-card-container">
          <h3 class="welcome">BEM-VINDO</h3>
          <div class="logo-name-container">
            <h3 class="logo-name">Nexus</h3>
          </div>
        </div>
        <p class="slogan">
          Carregue sua planilha e deixe que nosso sistema a formate automaticamente. Simplifique suas tarefas e economize tempo!
        </p>
      </v-card>

      <!-- Segundo card (branco) -->
      <v-card class="card-second" color="#ffffff">
        <v-row>
          <v-col class="text-center">
              <v-img class="logo-img" src="./img/eceng.png"></v-img>

          </v-col>
        </v-row>
        <v-form class="form-container">
          <v-card-text>
            <v-row dense>
              <v-col dense>
                <v-combobox
                  label="Escolha o tipo de relatório"
                  class="input-field"
                  :items="listReport"
                  item-title="type"
                  item-value="id"
                  v-model="selectedReportType"
                  prepend-icon="mdi-menu"
                  dense
                  outlined
                  hide-details
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-file-input
                  label="Carregue seu arquivo"
                  class="input-field"
                  accept=".xlsx, .xls"
                  v-model="uploadedFile"
                  dense
                  outlined
                  hide-details
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <!-- Botão com carregamento -->
              <v-btn
                class="btn-login"
                :disabled="!isFormValid || loading"
                @click="formatAndDownloadReport"
              >
                <span v-if="!loading">Formatar</span>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="secondary"
                  size="24"
                  class="ml-2"
                ></v-progress-circular>
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </v-main>
</template>

<script>
import { useToast } from "vue-toastification"; // Importar o toast
import NavBar from "../NavBar.vue";

export default {
  name: "TwoCardsExample",
  components: {
    NavBar
  },

  data: () => ({
    loading: false,
    uploadedFile: null,
    selectedReportType: null,
    listReport: [
      { id: 1, type: "Contas pagas por conta corrente" },
      { id: 2, type: "Títulos por data" }
    ],
  }),
  computed: {
    isFormValid() {
      // Verifica se o arquivo e o tipo de relatório foram selecionados
      return this.uploadedFile && this.selectedReportType;
    },
  },
  methods: {
    async formatAndDownloadReport() {
      console.log("Método chamado"); // Verificar se o método é invocado
      const toast = useToast(); // Criar instância do toast
      this.loading = true;

      try {
        if (!this.isFormValid) {
          throw new Error(
            "Selecione um tipo de relatório e carregue um arquivo."
          );
        }

        const formData = new FormData();
        formData.append("report", this.selectedReportType.type);
        formData.append("myFile", this.uploadedFile);

        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Erro ao processar o relatório: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "relatorio_formatado.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Notificação de sucesso
        toast.success("Relatório formatado com sucesso!");
      } catch (error) {
        console.error(error.message);
        // Notificação de erro
        toast.error(`Erro: ${error.message}`);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.card-first {
  position: absolute;
  border-radius: 20px;
  z-index: 1;
  width: 550px;
  height: 550px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transform: translate(-180px);
}

.card-second {
  position: absolute;
  border-radius: 20px;
  z-index: 2;
  width: 430px;
  height: 550px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transform: translate(220px);
}

.form-container {
  margin-top: 70px;
}

.green-card-container {
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
}

.welcome {
  font-size: 1.6rem;
  margin-top: 100px;
  margin-right: 90px;
}

.logo-name-container {
  display: inline-block;
  background-color: #1f4a61;
  height: 35px;
  width: 120px;
  margin-top: 110px;
  margin-left: 15px !important;
  transform: skew(20deg);
  border-radius: 10%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

.logo-name {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  transform: skew(-20deg);
  margin: 0;
}

.slogan {
  width: 350px;
  font-size: 1rem;
  margin-top: 100px;
  margin-right: 90px;
  word-wrap: break-word; 
  justify-self: center;
  text-align: center; 
  line-height: 1.4; 
}

.btn-login {
  color: #ffffff;
  background-color: #1C4053;
  width: 30%;
  height: 40px;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(34, 107, 16, 0.4);
}

.logo-img {
  width: auto;
  height: 150px;
  margin-top: 20px;
  object-fit: cover;
}
</style>
