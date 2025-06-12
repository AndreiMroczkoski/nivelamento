package com.example.aplicacaodesktop;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class DesktopApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(DesktopApplication.class.getResource("cadastro-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 600, 400);
        stage.setTitle("Inicialização do Sistema - Cadastro de Usuário");
        stage.setScene(scene);
        stage.setResizable(false); // Impede que a janela seja redimensionada
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}