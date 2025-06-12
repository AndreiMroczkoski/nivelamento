package com.example.aplicacaodesktop.controllers;

import com.example.aplicacaodesktop.model.UsuarioSalvarRequest;
import com.example.aplicacaodesktop.services.ApiService;
import com.fasterxml.jackson.databind.JsonNode;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import java.net.http.HttpResponse;

public class UsuarioController {

    @FXML private TextField usuarioField;
    @FXML private PasswordField senhaField;
    @FXML private TextField cepField;
    @FXML private TextField logradouroField;
    @FXML private TextField bairroField;
    @FXML private TextField cidadeField;
    @FXML private TextField estadoField;

    private final ApiService apiService = new ApiService();

    @FXML
    public void initialize() {
        cepField.textProperty().addListener((observable, oldValue, newValue) -> {
            String cepNumerico = newValue.replaceAll("[^\\d]", "");
            if (cepNumerico.length() == 8) {
                buscarCep(cepNumerico);
            }
        });
    }

    private void buscarCep(String cep) {
        new Thread(() -> {
            try {
                JsonNode endereco = apiService.buscarCep(cep);
                Platform.runLater(() -> {
                    if (endereco != null) {
                        logradouroField.setText(endereco.get("logradouro").asText());
                        bairroField.setText(endereco.get("bairro").asText());
                        cidadeField.setText(endereco.get("localidade").asText());
                        estadoField.setText(endereco.get("uf").asText());
                    } else {
                        showAlert(Alert.AlertType.WARNING, "CEP não encontrado", "O CEP informado não retornou um endereço válido.");
                        limparCamposEndereco();
                    }
                });
            } catch (Exception e) {
                Platform.runLater(() -> showAlert(Alert.AlertType.ERROR, "Erro de Rede", "Falha ao buscar o CEP: " + e.getMessage()));
            }
        }).start();
    }

    @FXML
    private void handleCadastrar() {
        String usuario = usuarioField.getText();
        String senha = senhaField.getText();
        String cep = cepField.getText().replaceAll("[^\\d]", "");
        String logradouro = logradouroField.getText();
        String bairro = bairroField.getText();
        String cidade = cidadeField.getText();
        String estado = estadoField.getText();

        if (usuario.isBlank() || senha.isBlank() || cep.isBlank() || logradouro.isBlank() || bairro.isBlank() || cidade.isBlank() || estado.isBlank()) {
            showAlert(Alert.AlertType.WARNING, "Campos Vazios", "Por favor, preencha todos os campos.");
            return;
        }

        UsuarioSalvarRequest novoUsuario = new UsuarioSalvarRequest(usuario, senha, cep, logradouro, bairro, cidade, estado);

        new Thread(() -> {
            try {
                HttpResponse<String> response = apiService.cadastrarUsuario(novoUsuario);
                Platform.runLater(() -> {
                    if (response.statusCode() == 200) {
                        showAlert(Alert.AlertType.INFORMATION, "Sucesso", "Usuário cadastrado com sucesso!");
                        Platform.exit();
                    } else {
                        showAlert(Alert.AlertType.ERROR, "Erro no Cadastro", "Falha ao cadastrar usuário. Resposta do servidor: " + response.body());
                    }
                });
            } catch (Exception e) {
                Platform.runLater(() -> showAlert(Alert.AlertType.ERROR, "Erro de Rede", "Não foi possível conectar ao servidor: " + e.getMessage()));
            }
        }).start();
    }

    private void limparCamposEndereco() {
        logradouroField.clear();
        bairroField.clear();
        cidadeField.clear();
        estadoField.clear();
    }

    private void showAlert(Alert.AlertType alertType, String title, String message) {
        Alert alert = new Alert(alertType);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }
}