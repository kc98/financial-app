const data = [
  {
    day: "monday", // data[0].day
    period: [
      {
        name: "morning", // data[0].period[0].name
        categories: [
          {
            name: "Food", // data[0].period[0].categories[0].name
            amount: 1234, // data[0].period[0].categories[0].amount
            average: amount / 12, // data[0].period[0].categories[0].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[0].period[0].categories[0].budget
          },
          {
            name: "Movies", // data[0].period[0].categories[1].name
            amount: 123, // data[0].period[0].categories[1].amount
            average: amount / 12, // data[0].period[0].categories[1].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[0].period[0].categories[1].budget
          },
        ],
      },
      {
        name: "afternoon",
        categories: [
          {
            name: "Food", // data[0].period[1].categories[0].name
            amount: 1234, // data[0].period[1].categories[0].amount
            average: amount / 12, // data[0].period[1].categories[0].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[0].period[1].categories[0].budget
          },
          {
            name: "Movies", // data[0].period[1].categories[1].name
            amount: 123, // data[0].period[1].categories[1].amount
            average: amount / 12, // data[0].period[1].categories[1].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[0].period[1].categories[1].budget
          },
        ],
      },
    ],
  },
  {
    day: "tuesday", // data[1].day
    period: [
      {
        name: "morning", // data[1].period[0].name
        categories: [
          {
            name: "Food", // data[1].period[0].categories[0].name
            amount: 1234, // data[1].period[0].categories[0].amount
            average: amount / 12, // data[1].period[0].categories[0].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[1].period[0].categories[0].budget
          },
          {
            name: "Movies", // data[1].period[0].categories[1].name
            amount: 123, // data[1].period[0].categories[1].amount
            average: amount / 12, // data[1].period[0].categories[1].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[1].period[0].categories[1].budget
          },
        ],
      },
      {
        name: "afternoon",
        categories: [
          {
            name: "Food", // data[1].period[1].categories[0].name
            amount: 1234, // data[1].period[1].categories[0].amount
            average: amount / 12, // data[1].period[1].categories[0].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[1].period[1].categories[0].budget
          },
          {
            name: "Movies", // data[1].period[1].categories[1].name
            amount: 123, // data[1].period[1].categories[1].amount
            average: amount / 12, // data[1].period[1].categories[1].average
            budget: ((amount / weeklyCategoryAmount) * budgetAmount) / 4, // data[1].period[1].categories[1].budget
          },
        ],
      },
    ],
  },
];
