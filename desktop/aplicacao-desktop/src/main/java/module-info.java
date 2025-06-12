module com.example.aplicacaodesktop {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.net.http;
    requires com.fasterxml.jackson.databind;
    requires javafx.graphics;
    requires java.desktop;


    opens com.example.aplicacaodesktop to javafx.fxml;
    exports com.example.aplicacaodesktop;
    exports com.example.aplicacaodesktop.controllers;
    opens com.example.aplicacaodesktop.controllers to javafx.fxml;
    opens com.example.aplicacaodesktop.model to com.fasterxml.jackson.databind;
}