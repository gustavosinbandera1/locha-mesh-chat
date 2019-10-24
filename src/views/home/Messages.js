import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableNativeFeedback,
  Image
} from "react-native";
import Moment from "moment";
import { Thumbnail, Icon } from "native-base";
import { sha256 } from "js-sha256";
import { getIcon, hashGenerateColort } from "../../utils/utils";
import Player from "../../components/Player ";

export const ReceiveMessage = ({
  onClick,
  onSelected,
  userInfo,
  item,
  contactInfo,
  selected
}) => {
  return (
    <TouchableNativeFeedback
      onLongPress={() => onSelected(item)}
      onPress={() => onClick(item)}
      style={{
        marginVertical: 5,
        minHeight: 70,
        width: "100%",
        flexDirection: "row"
      }}
    >
      <View style={[styles.receiveContainer, selected]}>
        {!item.toUID && !contactInfo && (
          <Thumbnail
            style={{
              marginLeft: 5,
              marginTop: 5
            }}
            source={{
              uri: `${getIcon(item.fromUID)}`
            }}
          />
        )}

        {!item.toUID && contactInfo && (
          <Thumbnail
            style={{
              marginLeft: 5,
              marginTop: 5
            }}
            source={{
              uri: `${userInfo.picture}`
            }}
          />
        )}
        <View style={{ width: "90%", flexDirection: "row" }}>
          <View style={styles.textContent1}>
            {item.name && (
              <Text
                style={{
                  paddingBottom: 7,
                  color: hashGenerateColort(item.fromUID)
                }}
              >
                {userInfo.name}
              </Text>
            )}
            <View style={{ minWidth: 110 }}>
              {item.file && (
                <View style={{ minWidth: "80%" }}>
                  <Image
                    style={{ width: "100%", height: 150 }}
                    source={{
                      resizeMode: "contain",
                      uri: item.file.file + "?" + new Date().getDate(),
                      cache: "force-cache"
                    }}
                  />
                </View>
              )}
              <Text style={{ fontSize: 15 }}>{item.msg}</Text>
            </View>
            <Text
              style={{
                paddingTop: 3,
                paddingLeft: 10,
                paddingBottom: 6,
                fontSize: 12,
                textAlign: "right"
              }}
            >
              {Moment(Number(item.timestamp)).format("LT")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export const SenderMessage = ({ onClick, onSelected, item, selected }) => {
  return (
    <TouchableNativeFeedback
      useForeground
      style={{
        marginVertical: 5,
        width: "100%",
        justifyContent: "flex-end",
        flexDirection: "row"
      }}
      onLongPress={() => onSelected(item)}
      onPress={() => onClick(item)}
    >
      <View style={[styles.senderContainer, selected]}>
        <View style={styles.textContent2}>
          {item.file && (
            <View style={{ minWidth: "80%" }}>
              <Image
                style={{ width: "100%", height: 150 }}
                source={{
                  resizeMode: "contain",
                  uri: item.file.file + "?" + new Date().getDate(),
                  cache: "force-cache"
                }}
              />
            </View>
          )}
          <Text style={{ fontSize: 15 }}>{item.msg}</Text>
          <Text
            style={{
              paddingTop: 7,
              paddingLeft: 5,
              paddingBottom: 6,
              fontSize: 12,
              textAlign: "right"
            }}
          >
            {Moment(Number(item.timestamp)).format("LT")}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export const SoundMessage = ({
  onClick,
  onSelected,
  userInfo,
  item,
  contactInfo,
  selected,
  rule,
  index,
  chats
}) => {
  if (!rule) {
    return (
      <TouchableNativeFeedback
        key={index}
        onLongPress={() => onSelected(item)}
        onPress={() => onClick(item)}
        style={{
          marginVertical: 5,
          minHeight: 70,
          width: "100%",
          flexDirection: "row"
        }}
      >
        <View style={[styles.receiveContainer, selected]}>
          {!item.toUID && !contactInfo && (
            <Thumbnail
              style={{
                marginLeft: 5,
                marginTop: 5
              }}
              source={{
                uri: `${getIcon(item.fromUID)}`
              }}
            />
          )}

          {!item.toUID && contactInfo && (
            <Thumbnail
              style={{
                marginLeft: 5,
                marginTop: 5
              }}
              source={{
                uri: `${userInfo.picture}`
              }}
            />
          )}
          <View style={{ width: "90%", flexDirection: "row" }}>
            <View style={styles.textContent1}>
              {item.name && (
                <Text
                  style={{
                    paddingBottom: 7,
                    color: hashGenerateColort(item.fromUID)
                  }}
                >
                  {userInfo.name}
                </Text>
              )}
              <Player path={item.file.file} />
              <Text
                style={{
                  paddingTop: 3,
                  paddingLeft: 10,
                  paddingBottom: 6,
                  fontSize: 12,
                  textAlign: "right"
                }}
              >
                {Moment(Number(item.timestamp)).format("LT")}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  } else {
    if (item.file.file === chats[index].file.file) {
      return (
        <TouchableNativeFeedback
          key={index}
          useForeground
          style={{
            marginVertical: 5,
            width: "100%",
            justifyContent: "flex-end",
            flexDirection: "row"
          }}
          onLongPress={() => onSelected(item)}
          onPress={() => onClick(item)}
        >
          <View style={[styles.senderContainer, selected]}>
            <View style={styles.textContent2}>
              <Player path={item.file.file} index={index} />
              <Text
                style={{
                  paddingTop: 7,
                  paddingLeft: 5,
                  paddingBottom: 6,
                  fontSize: 12,
                  textAlign: "right"
                }}
              >
                {Moment(Number(item.timestamp)).format("LT")}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#eeeeee",
    paddingBottom: 10
  },
  senderContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10
  },

  selected: {
    backgroundColor: "rgba(255, 235, 59 , 0.5)"
  },

  receiveContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 10,
    flexDirection: "row"
  },
  textContent1: {
    maxWidth: "82%",
    backgroundColor: "#fff",
    minHeight: 30,
    paddingTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 7,
    flexDirection: "column"
  },
  textContent2: {
    maxWidth: "82%",
    backgroundColor: "#fff",
    minHeight: 30,
    paddingTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 7,
    flexDirection: "column",
    backgroundColor: "#bbdefb"
  }
});