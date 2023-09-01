import { convertMinutesToTime } from "@/helpers/convertMinutesToTime.helper.js";

test("Convert minutes to time", () => {
  expect(convertMinutesToTime(70)).toBe("1h10m");
});
