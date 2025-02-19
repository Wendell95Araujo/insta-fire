const db = firebase.firestore();
const postsData = {
  "1": { likes: 57, comments: [{ user: "Lucas", text: "Que vista incrível! 🌄" }] },
  "2": { likes: 102, comments: [{ user: "Amanda", text: "Lugar perfeito para relaxar!" }] },
  "3": { likes: 78, comments: [{ user: "Carlos", text: "Parece um sonho 😍" }] },
  "4": { likes: 44, comments: [{ user: "Fernanda", text: "Que paz essa paisagem transmite!" }] },
  "5": { likes: 96, comments: [{ user: "Ricardo", text: "Definitivamente na minha lista de lugares para visitar!" }] },
  "6": { likes: 85, comments: [{ user: "Juliana", text: "Maravilhoso! 💖" }] },
  "7": { likes: 110, comments: [{ user: "Thiago", text: "Me lembra uma pintura!" }] },
  "8": { likes: 73, comments: [{ user: "Gabriela", text: "Parece um paraíso escondido!" }] },
  "9": { likes: 50, comments: [{ user: "Roberto", text: "Que combinação de cores maravilhosa!" }] },
  "10": { likes: 120, comments: [{ user: "Carla", text: "Preciso visitar esse lugar um dia!" }] },
  "11": { likes: 57, comments: [{ user: "Rodrigo", text: "Que vista maravilhosa!" }] },
  "12": { likes : 102, comments: [{ user: "Joana", text: "Lugar perfeito!" }] }
};

Object.entries(postsData).forEach(([id, data]) => {
  db.collection("posts").doc(id).set(data);
});