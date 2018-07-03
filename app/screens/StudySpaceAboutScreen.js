import React, { Component } from "react";
import { Image } from "react-native";
import { TitleText, SubtitleText, BodyText } from "../components/Typography";
import Styles from "../styles/Containers";
import { Page } from "../components/Containers";

class StudySpaceAboutScreen extends Component {
  static navigationOptions = {
    title: "About Study Spaces",
  };

  render() {
    return (
      <Page>
        <TitleText>How Do We Work Out How Busy Study Spaces Are?</TitleText>
        <Image
          source={require("../assets/images/undraw_graduation.png")}
          resizeMethod="scale"
          style={Styles.image}
          resizeMode="contain"
        />
        <BodyText>
          Under almost every desk in UCL{"'"}s libraries, there is a sensor that
          detects the presence of a person, and reports this information back to
          the UCL Library team. UCL Assistant can then request this information
          to display in the app. We can even count the number of occupied seats
          in each study space to give you a real time overview of which
          locations are the most busy!
        </BodyText>
        <TitleText>Frequently Asked Questions</TitleText>

        <SubtitleText>Does this violate students{"'"} privacy?</SubtitleText>
        <BodyText>
          The sensors don{"'"}t capture any photos or broadcast anything other
          than a true/false value saying whether the desk is occupied or not.
        </BodyText>

        <SubtitleText>
          What about people who get up and leave their belongings on the desk?
        </SubtitleText>
        <BodyText>
          The sensors will remain as {'"'}occupied{'"'} for roughly 30 minutes
          after they stop detecting a person, to account for these rest breaks.
        </BodyText>

        <SubtitleText>What do the charts show?</SubtitleText>
        <BodyText>
          The charts displayed show the average numbers of seats occupied
          throughout the day. This can be useful in working out when the
          quietest times in the day are, and what your chances of getting a seat
          are.
        </BodyText>
        <BodyText>
          These averages are taken over the last thirty days, so they should
          account for peculiarities like exam season or holidays.
        </BodyText>

        <SubtitleText>What does the red bar mean on the charts?</SubtitleText>
        <BodyText>
          This shows you the current number of occupied seats at the current
          time of day against the average. You can then see if the space is
          busier or quieter than normal.
        </BodyText>
      </Page>
    );
  }
}

export default StudySpaceAboutScreen;
