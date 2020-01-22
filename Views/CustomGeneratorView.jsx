import React from "react";
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import normalize from "react-native-normalize";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { withNavigationFocus } from 'react-navigation';
import { ProfileConsumer } from "../Providers/ProfileProviderConfig";
import { preventAutoHide } from "expo/build/launch/SplashScreen";

class CustomGeneratorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            profilePic: this.props.navigation.getParam('uri'),
            bottomText: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.setState({ profilePic: this.props.navigation.getParam('uri') });
        }
    }


    render() {
        return (
            <ProfileConsumer>
                {value => (
                    <View style={styles.container}>
                        <View style={styles.scrollContainer}>
                            <TextInput
                                style={styles.titleInput}
                                placeholder="Nazwa alternatywki"
                                textAlign={'center'}
                                maxLength={20}
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.setState({ title: text })}
                                value={this.state.title}
                            />
                            <TouchableOpacity
                                activeOpacity={0.7}
                            >

                                <Image
                                    source={{ uri: this.props.navigation.getParam('uri') }}
                                    style={styles.picture}
                                />
                            </TouchableOpacity>

                            <TextInput
                                style={styles.bottomTextInput}
                                placeholder="Dolny tekst"
                                textAlign={'center'}
                                multiline
                                numberOfLines={2}
                                maxLength={43}
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.setState({ bottomText: text })}
                                value={this.state.bottomText}
                            />
                        </View>
                        <TouchableOpacity style={{
                            alignSelf: "center", height: "6%", margin: normalize(15, "height"),
                            width: "60%",
                            backgroundColor: "gray",
                            borderRadius: normalize(15),
                            overflow: "hidden",
                            marginTop: normalize(20, "height"),
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 7

                        }}
                            onPress={() => {
                                value.customsPush(this.state.title, this.state.bottomText, this.state.profilePic);
                                this.setState({ title: "", bottomText: "", profilePic: "" });
                                this.props.navigation.navigate("Home");

                            }}>
                            <Text style={{ fontSize: normalize(20), color: "white" }}>Zatwierdź</Text>
                        </TouchableOpacity>
                    </View>
                )

                }</ProfileConsumer>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    picture: {
        width: normalize(300),
        height: normalize(300),
        borderRadius: 90 / 2,
        overflow: "hidden"
    },
    scrollContainer: {
        alignContent: "center",
        paddingVertical: 4,
        paddingHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width
    },

    titleInput: {
        marginBottom: 10,
        // height: "10%",
        width: "70%",
        // borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 10,
        // overflow: "hidden",
        fontSize: 25,
    },
    bottomTextInput: {
        // height: "14%",
        width: "90%",
        // borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 10,
        // overflow: "hidden",
        fontSize: 20,
        marginTop: 10,
        textAlign: "center"
    }
});

export default withNavigationFocus(CustomGeneratorView);