package com.example.aplicacaodesktop.model;

public record UsuarioSalvarRequest(String usuario, String senha, String cep, String logradouro, String bairro, String cidade, String estado
) {}