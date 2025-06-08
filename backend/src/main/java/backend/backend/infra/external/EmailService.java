package backend.backend.infra.external;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.Year;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Async
    public void enviarEmailSimples(String para, String assunto, String texto) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setFrom("nao-responda@meusite.com");
        mensagem.setTo(para);
        mensagem.setSubject(assunto);
        mensagem.setText(texto);
        emailSender.send(mensagem);
    }

    @Async
    public void enviarEmailComTemplate(String para, String assunto, String mensagemPersonalizada){
        try {


            MimeMessage mensagem = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

            // Carrega o template HTML
            String htmlTemplate = carregarTemplateEmail();

            // Substitui os placeholders
            String htmlFinal = htmlTemplate
                    .replace("${mensagemPersonalizada}", mensagemPersonalizada)
                    .replace("${anoAtual}", String.valueOf(Year.now().getValue()));

            helper.setFrom("nao-responda@meusite.com");
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(htmlFinal, true); // HTML = true

            emailSender.send(mensagem);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private String carregarTemplateEmail() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/email-template.html");
        byte[] bytes = Files.readAllBytes(resource.getFile().toPath());
        return new String(bytes, StandardCharsets.UTF_8);
    }
}