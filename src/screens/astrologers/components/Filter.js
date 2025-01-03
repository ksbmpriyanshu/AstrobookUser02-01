import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as AstrologerActions from '../../../redux/actions/AstrologerActions';
import { connect } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Fonts } from '../../../assets/style';
import { CheckBox } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
const Filter = ({ dispatch, filterData, skillData, languageData }) => {
    const navigation=useNavigation();
    console.log("languageData", languageData)
    const refRBSheet = useRef();
    const [activeFilter, setActiveFilter] = useState(null);
    const handleFilterPress = (filter) => {
        setActiveFilter(filter === activeFilter ? null : filter);
    };
    // Get Experties Data
    const [showGender, setShowGender] = useState(true)
    const [showSkills, setShowSkills] = useState(false)
    const [showLanguage, setShowLanguage] = useState(false)

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedGender, setSelectedGender] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const toggleSkillSelection = (skill) => {
        setSelectedSkills((prevSkills) => {
            if (prevSkills.includes(skill)) {
                return prevSkills.filter((item) => item !== skill);
            } else {
                return [...prevSkills, skill];
            }
        });
    };
    const toggleGenderSelection = (gender) => {
        setSelectedGender((prevState) => {
            if (prevState.includes(gender)) {
                return prevState.filter((item) => item !== gender);
            } else {
                return [...prevState, gender];
            }
        });
    };
    const toggleLanguageSelection = (language) => {
        setSelectedLanguage((prevState) => {
            if (prevState.includes(language)) {
                return prevState.filter((item) => item !== language);
            } else {
                return [...prevState, language];
            }
        });
    };
    useEffect(() => {
        dispatch(AstrologerActions.getFilterData());
        dispatch(AstrologerActions.getSkillData());
        dispatch(AstrologerActions.getlanguageData());
    }, [dispatch])
    useEffect(() => {
        const data = {
            mainExpertise: selectedItemId,
            gender: selectedGender,
            language: selectedLanguage,
            skill: selectedSkills,
            page: 1,
        };

        console.log("Filter Data", data);
        dispatch(AstrologerActions.getChatAstroData(data));
    }, [selectedItemId, selectedGender, selectedLanguage, selectedSkills, dispatch]);




    const handleRemoveFilter = () => {
        setSelectedItemId(null);
        setSelectedGender([]);
        setSelectedSkills([]);
        setSelectedLanguage([]);
        dispatch(AstrologerActions.getChatAstroData({ page: 1 }));
        refRBSheet.current.close()
    };
    return (
        <View style={{ paddingLeft: 10, marginBottom: 10, marginTop: 10, display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('Search')}
            >
            <Image
            
            source={require("../../../assets/astrobookimages/search.png")} style={{ width: 30, height: 30, objectFit: "contain" }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                refRBSheet.current.open()
            }}>

                <Image
                    source={require("../../../assets/astrobookimages/filter_btn.png")}
                    style={{ width: 70, height: 30, objectFit: "contain" }}
                />
            </TouchableOpacity>

            <RBSheet
                ref={refRBSheet}
                height={500}
                useNativeDriver={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        backgroundColor: '#000',

                    },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}>

                <View style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.sortText}>Sort & Filter</Text>
                    </View>
                    <View style={styles.filterView}>
                        <View style={{ backgroundColor: "#F7F7F7", flex: 0.4, paddingHorizontal: 10, paddingTop: 20, }}>
                            <TouchableOpacity onPress={() => {
                                setShowGender(true)
                                setShowSkills(false)
                                setShowLanguage(false)
                            }}
                                style={{ marginBottom: 20}}
                            >
                                <Text style={styles.filterTextSkills}>Gender</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setShowGender(false)
                                setShowSkills(true)
                                setShowLanguage(false)
                            }}
                                style={{ marginBottom: 20, }}
                            >
                                <Text style={styles.filterTextSkills}>Skills</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setShowGender(false)
                                setShowSkills(false)
                                setShowLanguage(true)
                            }}
                                style={{ marginBottom: 20,}}
                            >
                                <Text style={styles.filterTextSkills}>Language</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.6, paddingHorizontal: 10, paddingBottom:20, paddingTop: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <ScrollView>
                                {showGender && (
                                    <>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                            <CheckBox
                                                checked={selectedGender.includes('Male')}
                                                onPress={() => toggleGenderSelection('Male')}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                checkedColor="#F1B646"
                                                uncheckedColor="gray"
                                                title="Male"
                                                containerStyle={styles.checkboxContainer}
                                                textStyle={styles.checkboxText}
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                            <CheckBox
                                                checked={selectedGender.includes('Female')}
                                                onPress={() => toggleGenderSelection('Female')}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                checkedColor="#F1B646"
                                                uncheckedColor="gray"
                                                title="Female"
                                                containerStyle={styles.checkboxContainer}
                                                textStyle={styles.checkboxText}
                                            />
                                        </View></>
                                )}

                                {showSkills && (
                                    <>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                            <FlatList data={skillData}
                                                keyExtractor={(item) => item?.id?.toString() || item?.skill}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <>
                                                            <CheckBox
                                                                checked={selectedSkills.includes(item?._id)}
                                                                onPress={() => toggleSkillSelection(item?._id)}
                                                                checkedIcon="dot-circle-o"
                                                                uncheckedIcon="circle-o"
                                                                checkedColor="#F1B646"
                                                                uncheckedColor="gray"
                                                                title={item?.skill}
                                                                containerStyle={styles.checkboxContainer}
                                                                textStyle={styles.checkboxText}
                                                            />
                                                        </>
                                                    )
                                                }} />

                                        </View>
                                    </>
                                )}

                                {showLanguage && (
                                    <>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                            <FlatList data={languageData}
                                                keyExtractor={(item) => item?.id?.toString() || item?.skill}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <>
                                                            <CheckBox
                                                                checked={selectedLanguage.includes(item?.languageName)}
                                                                onPress={() => toggleLanguageSelection(item?.languageName)}
                                                                checkedIcon="dot-circle-o"
                                                                uncheckedIcon="circle-o"
                                                                checkedColor="#F1B646"
                                                                uncheckedColor="gray"
                                                                title={item?.languageName}
                                                                containerStyle={styles.checkboxContainer}
                                                                textStyle={styles.checkboxText}
                                                            />
                                                        </>
                                                    )
                                                }} />

                                        </View>
                                    </>
                                )}
                            </ScrollView>
                            <View>
                                <TouchableOpacity style={{
                                    backgroundColor: "#F1B646",
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                }}
                                    onPress={handleRemoveFilter}
                                >
                                    <Text style={{ textAlign: 'center', color: "#000", ...Fonts.primaryHelvetica }}>Remove Filter</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>


                </View>
            </RBSheet>
            <FlatList
                data={filterData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isSelected = item?._id === selectedItemId;
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedItemId(item?._id === selectedItemId ? null : item?._id);
                                const data = {
                                    mainExpertise: item?._id,
                                    page: 1,
                                };
                                console.log("Selected item ID:", item?._id);
                                dispatch(AstrologerActions.getChatAstroData(data));
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 0,
                                    gap: 5,
                                    backgroundColor: isSelected ? "#000" : "transparent",
                                    borderRadius: 40,
                                    padding: 5,
                                    paddingHorizontal: 10,
                                }}
                            >

                                <Image
                                    source={require("../../../assets/astrobookimages/filter_image.png")}
                                    style={{ width: 15, height: 15}}
                                />
                                <Text style={{ color: isSelected ? "#fff" : "#000", fontSize: 12.5 }}>
                                    {item?.mainExpertise}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    )
}
const mapStateToProps = state => ({
    filterData: state.astrologer.filterData,
    skillData: state.astrologer.skillData,
    languageData: state.astrologer.languageData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

const styles = StyleSheet.create({
    proceedBtn: {
        backgroundColor: "#F1B646",
        paddingVertical: 15,
    },
    proceedText: {
        color: "#fff",
        ...Fonts.primaryHelvetica,
        textAlign: 'center',
        fontWeight: "700"
    },
    sortText: {
        backgroundColor: '#F1B646',
        color: "#fff",
        textAlign: "center",
        ...Fonts.primaryHelvetica,
        paddingVertical: 15,
    },
    crossBtn: {
        height: 30,
        width: 30,
        objectFit: "contain",
        backgroundColor: "#fff",
        borderRadius: 40,
        marginTop: -20,
        //  position:"absolute",
        //  top:-20,
        //  left:30,
    },
    filterView: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#fff",
        flex: 0.9,

    },
    filterTextSkills: {
        ...Fonts.primaryHelvetica,
        color: "#000", fontSize: 14,
        marginBottom: 10,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0,
    },
    checkboxText: {
        ...Fonts.primaryHelvetica,
        color: "#000", fontSize: 14,
        marginBottom: 10,
        fontWeight:"500",
        marginTop:9,
    }


})