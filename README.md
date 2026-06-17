# 🌱 SENARI - Sustentabilidade e Participação Estudantil

## 📱 Visão Geral
SENARI é um aplicativo mobile open-source desenvolvido em React Native + Expo com o objetivo de promover sustentabilidade, conscientização ambiental, gamificação e participação estudantil dentro de instituições de ensino profissional.

Esse projeto segue o princípio **SENARI**:
- **🌱 Sustentabilidade**: Promover práticas sustentáveis por meio da conscientização, responsabilidade coletiva e incentivo a ações com impacto positivo no ambiente e na comunidade.
- **📗 Educação Verde**: Transformar a plataforma em um ambiente de aprendizado contínuo e colaborativo, incentivando conscientização ambiental e o compartilhamento de conhecimento.
- **🛡️ Neutralidade**: Garantir a privacidade, segurança e transparência, mantendo um ambiente ético, equilibrado, gratuito e livre de práticas punitivas e discriminatórias.
- **♿ Acessibilidade**: Assegurar inclusão digital e facilidade de uso, permitindo que pessoas de diferentes públicos possam utilizar a plataforma de forma acessível e intuitiva.
- **🏆 Reconhecimento Ativo**: Valorizar esforço, participação, iniciativas, projetos e boas práticas da comunidade, recompensando dedicação e impacto real.
- **🤝 Integração**: Promover conexão e colaboração entre pessoas, escolas, instituições, empresas e comunidades.

## 🎯 Objetivos
- ✅ Promover sustentabilidade e conscientização ambiental
- 🎮 Gamificação através de EcoPontos, níveis e conquistas
- 👥 Participação e engajamento estudantil
- 🏆 Sistema de ranking e desafios
- 🤝 Trabalho em equipe e comunidade
- 📊 Transparência e auditoria de ações

## 🛠️ Stack Tecnológico

- **Frontend**: React Native + Expo
- **Linguagem**: TypeScript
- **Navegação**: React Navigation
- **Estado**: Zustand
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Messaging)
- **Notificações**: Expo Notifications + Firebase Cloud Messaging
- **Câmera/Galeria**: Expo Image Picker

## 🔐 Segurança & Autenticação

### Fluxo de Autenticação

1. **Login**: E-mail + Senha com bloqueio temporário contra tentativas excessivas
2. **Verificação de E-mail**: Código obrigatório antes de acesso completo
3. **2FA (Dois Fatores)**: Ações críticas requerem autenticação adicional
4. **Recuperação de Senha**: Com verificação de e-mail

### Permissões & Cargos

- **Aluno**: Participação em missões, comunidade, equipes
- **Coordenador**: Gerenciamento de missões e equipes
- **Gestor Institucional**: Administração completa da instituição
- **Dev**: Permissões técnicas e administrativas

## 📋 Funcionalidades Principais

### 🏠 Home
- Saudação personalizada baseada no cargo
- Exibição de nome, foto de perfil (editáveis 1x/dia) e EcoPontos
- Ranking pessoal, por turma e global
- Missões ativas e atividades recentes
- Avisos e notificações

### 🎯 Missões
- Criação, edição e exclusão por Coordenadores
- Banner, título, descrição, mídia
- Sistema de progresso com QR Code ou código criptografado
- Evidências: imagens, vídeos, documentos
- Comentários e equipes

### 👥 Equipes
- Públicas, privadas ou restritas
- Formação: livre, aleatória ou manual
- Cargos internos: Líder, Sub-Líder, Administrador, Membro
- Status de usuários online

### 💬 Comunidade
- Sistema de fórum moderno com feeds
- Publicações, comentários e respostas
- Sistema EcoValeu (aprovação com ícone de folha)
- Comentários aninhados com até 3 níveis
- Denúncias de conteúdo
- Editor de texto rico com formatações avançadas

### 🌟 EcoPontos & Ranking
- Acúmulo de pontos por missões e atividades
- Sistema de níveis progressivos
- Conquistas desbloqueáveis
- Ranking individual, por turma e global

## 📦 Instalação
### Pré-requisitos
- Node.js >= 18.0.0
- npm >= 9.0.0
- Expo CLI: `npm install -g eas-cli`

### Setup Inicial
```bash
# Clone o repositório
git clone https://github.com/vViniciuX/senari.git
cd senari

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais Firebase

# Inicie o projeto
npm start
```

### Executar em Plataformas
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🏗️ Estrutura do Projeto
```
src/
├── config/          # Configurações (Firebase, etc)
├── screens/         # Telas do aplicativo
├── components/      # Componentes reutilizáveis
├── services/        # Serviços (Auth, Firestore, etc)
├── stores/          # Estado global (Zustand)
├── hooks/           # Custom hooks
├── utils/           # Funções utilitárias
├── theme/           # Temas e estilos
├── types/           # Tipos TypeScript
└── constants/       # Constantes globais
```

## 🎨 Design & Temas
- Suporte completo a tema claro e escuro
- Sistema de cores consistente
- Tipografia responsiva
- Segurança de áreas seguras (notch, Dynamic Island, etc)
- Nenhum conteúdo oculto por barra inferior, teclado, notch ou Safe Areas

## 📱 Compatibilidade
- ✅ iOS 13+
- ✅ Android 8+
- ✅ Todos os tamanhos de tela (phone, tablet)
- ✅ Diferentes orientações de tela

## 📊 Auditoria & Logs
Todas as ações importantes são registradas:
- Criação, edição, exclusão de recursos
- Mudanças de cargo e permissões
- Participação em missões
- Denúncias e ações administrativas
- Geração e uso de QR Codes

## 🤝 Contribuindo

Somos um projeto open-source! Contribuições são bem-vindas.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores
- **vViniciuX** - Criador e Mantenedor Principal

## 🙏 Agradecimentos
- React Native e Expo communities
- Firebase por infraestrutura confiável

## 📞 Suporte
Para suporte, abra uma issue no GitHub ou entre em contato através do e-mail do projeto.

---

**Desenvolvido com ♻️ para um futuro sustentável**
