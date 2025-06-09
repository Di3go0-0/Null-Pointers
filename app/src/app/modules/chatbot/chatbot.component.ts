import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
interface ChatMessage {
  sender: 'bot' | 'user';
  message: string;
  time: string;
}
@Component({
  selector: 'app-chatbot',
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  FAQS = [
    {
      question: '¿Cómo puedo ver mis calificaciones?',
      answer: 'para ver tus notas debes insgresar a la plataforma, e ir al apartado de notas ahi te aparecen.'
    },
    {
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Ve a tu perfil y haz clic en "Cambiar contraseña". Ingresa tu contraseña actual y la nueva, luego guarda los cambios.'
    },
    {
      question: '¿Cómo me inscribo en una materia?',
      answer: 'para inscribirte en una materia, ve a la sección de "Materias" y selecciona la opción "Inscribir Materia". Allí podrás ver las materias disponibles y elegir la que desees.'
    },
    {
      question: '¿Cómo accedo al chatbot?',
      answer: 'El chatbot está disponible en el login. Solo haz clic en "Preguntas Frecuentes" en el boton inferior.'
    },
    // Agrega más pares pregunta-respuesta aquí
  ];
showFAQs = false;
  messages: ChatMessage[] = [
    {
      sender: 'bot',
      message: '¡Hola! Soy el chatbot de CampusConnect. ¿En qué puedo ayudarte hoy?',
      time: this.currentTime()
    }
  ];
  userInput = '';

  sendMessage() {
    const question = this.userInput.trim();
    if (!question) return;

    this.messages.push({ sender: 'user', message: question, time: this.currentTime() });

    const faq = this.FAQS.find(f => question.toLowerCase().includes(f.question.toLowerCase()));

    setTimeout(() => {
      if (faq) {
        this.messages.push({ sender: 'bot', message: faq.answer, time: this.currentTime() });
      } else {
        this.messages.push({
          sender: 'bot',
          message: 'Lo siento, no entiendo tu pregunta. Intenta con otra o haz clic en "Mostrar preguntas frecuentes".',
          time: this.currentTime()
        });
      }
    }, 500);

    this.userInput = '';
  }

  askFAQ(faq: { question: string, answer: string }) {
    this.userInput = faq.question;
    this.sendMessage();
    this.showFAQs = false;
  }

  toggleFAQ() {
    this.showFAQs = !this.showFAQs;
  }

  currentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

}
