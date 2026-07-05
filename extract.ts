import {
  mockProfiles,
  profileLibraryBooks,
  profileReviews,
  profileActivity,
} from "./lib/mock/profile";
import * as fs from "fs";

const data = {
  mockProfiles,
  profileLibraryBooks,
  profileReviews,
  profileActivity,
};

fs.writeFileSync("./lib/data/profileData.json", JSON.stringify(data, null, 2));
console.log("Successfully wrote profileData.json");
