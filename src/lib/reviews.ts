export type CustomerReview = {
  name: string;
  location: string;
  text: string;
  rating: number;
};

export const customerReviews: CustomerReview[] = [
  {
    name: "Kim R.",
    location: "Los Angeles, CA",
    rating: 5,
    text: "This is the second time I have used The Plumbing Stars. We needed repairs to our ground drains to the street for years. The team came out quickly, on time (even a bit early). They were clean and clearly laid out the project and fair price. I will definitely use them again!",
  },
  {
    name: "Adriana B.",
    location: "Los Angeles, CA",
    rating: 5,
    text: "I was hesitant to use these guys, given so few reviews posted. But since they were all 5 stars, I gave them a shot. So glad I did! The staff is very courteous & professional and don't give you the runaround. They inspected the leaky/broken pipe the same day and quoted one third of another company's price — and managed to get a crew the morning of the scheduled work after a freeway accident. Highly recommend.",
  },
  {
    name: "Danette B.",
    location: "Moorpark, CA",
    rating: 5,
    text: "The Plumbing Stars are amazing! They came out super late at night when my bathroom started to flood my home. Tony got me draining in no time and even gave me a few options for a more long-term fix. I will refer them to everyone I know, thank you, Tony, you rock.",
  },
];
