const Teams = require("../model/teams");
const mongoose = require("mongoose");
const Events = require("../model/event");
const review = require("../model/team_review");

const url = "mongodb://localhost:27017/Test";

beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Teams Schema Test ", () => {
  it("Registration Test", () => {
    const team_data = {
      teamname: "Bayern Munchen",
      teamcaptain: "Lewandonski",
      email: "rld.gmail.com",
      password: "1234",
      teamcontact: "123456789",
      teamhomeground: "Munich",
      teamimage: "default.png",
    };
    return Teams.create(team_data).then((pro_ret) => {
      expect(pro_ret.teamcaptain).toEqual("Lewandonski");
    });
  });
  //LOGIN
  it("Team login test", () => {
    const credentials = {
      email: "rld.gmail.com",
      password: "1234",
    };
    return Teams.findOne(credentials).then((value) => {
      expect(value.password).toEqual("1234");
    });
  });

  // Create EVENT
  it("Event Created", () => {
    const event_data = {
      home_team: "606a875c4cedec1f5ccbe9a2",
      date: "05/04/2022",
      time: "17:00",
      contact: "999999",
      event_location: "Northpoint",
    };
    return Events.create(event_data).then((pro_ret) => {
      expect(pro_ret.event_location).toEqual("Northpoint");
    });
  });

  //UPDATE Event
  it("Update Event", async () => {
    // const new_location = "Bhaisipati";
    return Events.findOneAndUpdate(
      { _id: Object("606a87cbeaff1d4afc4104da") },
      { $set: { event_location: "Bhaisipati" } }
    ).then((pp) => {
      expect(pp.event_location).toEqual("Bhaisipati");
    });
  });

  // Show Event
  it("Show Event", async () => {
    return Events.find().then((data) => {
      //   expect(data.event_location).toEqual("Northpoint");
      expect(status.ok).toBe(1);
    });
  });

  //Delete Event
  it("Delete Event", async () => {
    return Events.deleteOne({ _id: "606a87cbeaff1d4afc4104da" });
    expect(status.ok).toBe(1);
  });

  // Create review
  it("Create Review", async () => {
    const review_data = {
      teamid: "6030b87387fc5249f4e66719",
      teamname: "Home",
      teamimage: "Home.jpg",
      comment: "Good Team",
      rate: 4,
    };
    return review.create(review_data).then((data) => {
      expect(data.teamname).toEqual("Home");
    });
  });

  //Show Reviews
  it("Show Review", async () => {
    return review.find().then((data) => {
      expect(data.teamname).toEqual("Home");
    });
  });

  //Update Review
  it("Update Review", async () => {
    // const new_location = "Bhaisipati";
    return review
      .findOneAndUpdate(
        { _id: Object("606a926299521a3d988fb851") },
        { $set: { rate: 3 } }
      )
      .then((pp) => {
        expect(pp.rate).toEqual(3);
      });
  });

  //Delete Review
  it("Delete Review", async () => {
    return review.deleteOne({
      _id: "606a96ce6796f94e5440d898",
    });

    expect(status.ok).toBe(1);
  });
});
