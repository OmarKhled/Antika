export default [
  {
    img: {
      src: ["1.jpg", "4.jpg"],
    },
    en: {
      name: "Old World Glope",
      description:
        "This Antiques shows the map of thw world before the conyinats have moved",
    },
    ar: {
      name: "كرة أرضية قديمة",
      description: "هذه التحفة تظهر خريطة العالم قبل ان تتحرك القارات",
    },
    category: "antiques",
    specifications: {
      width: 30,
      height: 40,
      brand: { en: "Antiques co", ar: "شركة الأنتيكات" },
      features: [
        {
          en: "Gives a good look to your office",
          ar: "تعطى شكلا جماليا لمكتبك",
        },
        {
          en: "Reduces Stress",
          ar: "تقلل من التوتر",
        },
      ],
    },
    rating: 3,
    price: 40,
    inStock: 30,
  },
  {
    img: {
      src: ["2.jpg"],
      alt: "Vase",
      category: "Decor",
    },
    en: {
      name: "Old Vase",
      description: "This Vase Belonged to the king Luis the 7th",
    },
    ar: {
      name: "مزهرية قديمة",
      description: "كانت هذه المزهرية ملكا للملك لويس السابع",
    },
    category: "antiques",
    specifications: {
      width: 30,
      height: 40,
      features: [
        {
          en: "Gives a good look to your office",
          ar: "تعطى شكلا جماليا لمكتبك",
        },
      ],
    },
    price: 80,
    inStock: 0,
  },
  {
    img: {
      src: ["3.jpg"],
      alt: "Telephone",
    },
    en: {
      name: "Old Telephone",
      description: "This Telephone shows How old phones operated",
    },
    ar: {
      name: "هاتف قديم",
      description: "تظهر لنا هذه التحفة كيف كانت تعمل الهواتف القديمة",
    },
    category: "antiques",
    specifications: {
      width: 30,
      height: 40,
      brand: { en: "", ar: "" },
      features: [
        {
          en: "Gives a good look to your office",
          ar: "تعطى شكلا جماليا لمكتبك",
        },
      ],
    },
    price: 70,
    inStock: 3,
  },
];
