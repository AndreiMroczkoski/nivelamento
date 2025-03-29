package backend.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    Scanner scan = new Scanner(System.in);
    private static final List<String> usuarios = new ArrayList<>();

    static {
        usuarios.add("Andrei");
        usuarios.add("César");
        usuarios.add("Deivis");
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        int opcaoEscolhida = 0;
        while (opcaoEscolhida != 5) {
            exibirMenu();

            String textDigitado = scan.nextLine();
            opcaoEscolhida = Integer.parseInt(textDigitado);
            Lista(opcaoEscolhida);
        }
    }

    public  void Lista(int opcaoEscolhida) {
        if (opcaoEscolhida == 1) {
            usuarios.forEach(System.out::println);
        }
        if (opcaoEscolhida == 2) {
            System.out.println("Digite o nome de usuário: ");
            String usuario = scan.nextLine();
            usuarios.add(usuario);
        }

    }



    private static void exibirMenu() {
        System.out.println("\nDigite o número da operação desejada:");
        System.out.println("1 -> Listar");
        System.out.println("2 -> Cadastrar");
        System.out.println("5 -> Sair");
    }
}
