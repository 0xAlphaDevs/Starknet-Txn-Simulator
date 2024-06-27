export const sampleData1 = JSON.stringify(
  {
    message:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    type: "warning",
    action: "delete",
  },
  null,
  2
);

export const sampleData2 = JSON.stringify(
  {
    message:
      "This will permanently delete your account and remove your data from our servers. Are you absolutely sure?",
    type: "danger",
    action: "confirm_delete",
  },
  null,
  2
);
