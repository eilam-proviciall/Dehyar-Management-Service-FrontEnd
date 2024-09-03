const jobTitleOptions = [
  {
    group: "دهیاری درجه 1 تا 6",
    titles: [
      { value: 1, label: "دهیار" },
      { value: 2, label: "کارشناس امور حقوقی و قراردادها" },
      { value: 3, label: "مسئول امور مالی" },
      { value: 4, label: "مسئول فنی، عمرانی و خدمات روستا" },
      { value: 5, label: "کارگر خدماتی" },
      { value: 6, label: "راننده" },
      { value: 12, label: "غیر مصوب" }
    ]
  },
  {
    group: "دهیاری درجه 3 و 4",
    titles: [
      { value: 7, label: "کارشناس امور اداری و فناوری اطلاعات" },
      { value: 8, label: "کارشناس اقتصادی و سرمایه‌گذاری" },
      { value: 9, label: "کارشناس خدمات روستایی" }
    ]
  },
  {
    group: "دهیاری درجه 5 و 6",
    titles: [
      { value: 10, label: "کارشناس مسئول فنی، عمرانی و خدمات روستا" },
      { value: 11, label: "کارشناس مسئول امور مالی" }
    ]
  }
];

const getJobTitleLabel = (value) => {
  for (const group of jobTitleOptions) {
    const title = group.titles.find(title => title.value === value);
    if (title) {
      return title.label;
    }
  }
  return "عنوان نامشخص"; // در صورتی که عنوان پیدا نشود
};

export { getJobTitleLabel };
export default jobTitleOptions;
