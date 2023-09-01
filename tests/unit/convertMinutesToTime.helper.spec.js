import { convertMinutesToTime } from "@/helpers/convertMinutesToTime.helper.js";

describe("convertMinutesToTime.helper.js", () => {
  it("Convert minutes to time", () => {
    expect(convertMinutesToTime(75)).toBe("1h15m");
    expect(convertMinutesToTime(60)).toBe("1h");
    expect(convertMinutesToTime(38)).toBe("0h38m");
  });
});
