/**
 * Catèmon In-Memory Database
 *
 * This array holds all Catèmon data. Each Catèmon has:
 * - id: unique identifier
 * - name: the Catèmon's name
 * - type: elemental/personality type (like Pokémon types)
 * - personality: key trait
 * - description: full description
 * - imageUrl: path to the card image (served from /images/)
 *
 * Add your card images to public/images/ as card-1.png through card-9.png
 */

const catemons = [
  {
    id: 1,
    name: "Shadow",
    type: "Dark",
    personality: "bully",
    description: "Big glowing emerald eyes, black as the night. A bully who loves to eat.",
    imageUrl: "/images/card-1.png",
  },
  {
    id: 2,
    name: "Graybaby",
    type: "Electric",
    personality: "rambunctious",
    description: "Gray, full of energy, tongue always sticking out.",
    imageUrl: "/images/card-2.png",
  },
  {
    id: 3,
    name: "Leelee",
    type: "Fairy",
    personality: "sweet and flirty",
    description: "Black and white like a cow, sweet and flirty like a princess.",
    imageUrl: "/images/card-3.png",
  },
  {
    id: 4,
    name: "Orange",
    type: "Fire",
    personality: "spoiled",
    description: "Very cute but annoying and spoiled, an uppity scaredy cat.",
    imageUrl: "/images/card-4.png",
  },
  {
    id: 5,
    name: "Chucky",
    type: "Normal",
    personality: "troublemaker",
    description: "Small orange troublemaker, sneezy boy, loves cuddles, short stubby legs.",
    imageUrl: "/images/card-5.png",
  },
  {
    id: 6,
    name: "Grace",
    type: "Psychic",
    personality: "diva",
    description: "Tiny gray diva, spoiled, always talking back, has a signature head twist.",
    imageUrl: "/images/card-6.png",
  },
  {
    id: 7,
    name: "Big Boy",
    type: "Ground",
    personality: "lazy",
    description: "Huge tabby with massive paws, loves laying in bed and bathing in sunlight.",
    imageUrl: "/images/card-7.png",
  },
  {
    id: 8,
    name: "Happy",
    type: "Ice",
    personality: "majestic",
    description: "Ancient majestic white cat with beautiful blue eyes.",
    imageUrl: "/images/card-8.png",
  },
  {
    id: 9,
    name: "Ginger",
    type: "Grass",
    personality: "mesmerizing",
    description: "Multicolored patterns with mesmerizing green eyes, similar build to Chucky.",
    imageUrl: "/images/card-9.png",
  },
];

module.exports = catemons;
