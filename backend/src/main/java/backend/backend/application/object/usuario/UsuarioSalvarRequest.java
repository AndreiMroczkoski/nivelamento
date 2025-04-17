package backend.backend.application.object.usuario;

public record UsuarioSalvarRequest(Long id, String usuario, String senha, Long cep, String logradouro, String bairro, String cidade, String estado){}
