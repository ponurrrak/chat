const select = {
  loginForm: '#welcome-form',
  messagesSection: '#messages-section',
  messagesList: '#messages-list',
  addMessageForm: '#add-messages-form',
  userNameInput: '#username',
  messageContentInput: '#message-content',
};

const classNames = {
  show: 'show',
  message: {
    basic: 'message',
    received: 'message--received',
    self: 'message--self',
    author: 'message__author',
    content: 'message__content',
  },
};

const references = {};

for(const key in select) {
  references[key] = document.querySelector(select[key]);
}

let userName;

const login = event => {
  event.preventDefault();
  if(references.userNameInput.value) {
    userName = references.userNameInput.value;
    references.loginForm.classList.remove(classNames.show);
    references.messagesSection.classList.add(classNames.show);
  } else {
    alert('Type your name first!');
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add(classNames.message.basic, classNames.message.received);
  const isSelfMessage = author === userName;
  if(isSelfMessage) {
    message.classList.add(classNames.message.self);
  }
  const messageHeader = document.createElement('h3');
  messageHeader.classList.add(classNames.message.author);
  messageHeader.appendChild(document.createTextNode(isSelfMessage ? 'You' : author));
  const messageContent = document.createElement('div');
  messageContent.classList.add(classNames.message.content);
  messageContent.appendChild(document.createTextNode(content));
  message.appendChild(messageHeader);
  message.appendChild(messageContent);
  references.messagesList.appendChild(message);
};

const sendMessage = event => {
  event.preventDefault();
  if(references.messageContentInput.value) {
    addMessage(userName, references.messageContentInput.value);
    references.messageContentInput.value = '';
  } else {
    alert('A message mustn\'t be empty!');
  }
};

references.loginForm.addEventListener('submit', login);

references.addMessageForm.addEventListener('submit', sendMessage);
