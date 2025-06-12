module com.example.aplicacaodesktop {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.aplicacaodesktop to javafx.fxml;
    exports com.example.aplicacaodesktop;
}