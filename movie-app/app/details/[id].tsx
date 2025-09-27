/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import {
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { useTheme } from "@/components/color-theme";
import { Ionicons } from "@expo/vector-icons";
import { useWatchlist } from "@/context/SavedMovies";

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/tv/series_id/watch/providers",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU",
  },
};

export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();

  const [info, setInfo] = useState<any>([]);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchLink, setWatchLink] = useState<string | null>(null);

  //set counter function
  async function fetchWithCounter(fetchFN: () => Promise<void>) {
    setPendingRequests((prev) => prev + 1);
    try {
      await fetchFN();
    } finally {
      setPendingRequests((prev) => {
        const newCount = prev - 1;
        if (newCount === 0) setIsLoading(false);
        return newCount;
      });
    }
  }

  useEffect(() => {
    if (!id || !type) return;

    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/watch/providers`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU",
            },
          }
        );

        const providers = response.data.results;
        console.log("Providers:", providers);

        if (providers.US && providers.US.link) {
          setWatchLink(providers.US.link);
        } else {
          setWatchLink(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProviders();
  }, [id, type]);

  useEffect(() => {
    fetchWithCounter(async () => {
      try {
        const response = await axios.request(options);
        const data = response.data.results;

        console.log("Providers:", data);

        // Example: get US link
        if (data.US && data.US.link) {
          setWatchLink(data.US.link);
        }

        setInfo(data);
      } catch (error: any) {
        console.log(error);
        setError("Something just Crushed!! see you in a jiffy");
      }
    });
  }, []);

  //Saved Movies
  const { addToWatchlist } = useWatchlist();

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const url =
          type === "tv"
            ? `https://api.themoviedb.org/3/tv/${id}?language=en-US`
            : `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU",
          },
        });
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, type]);

  ///Dark Theme and Light Theme
  const { theme, colors, toggleTheme } = useTheme();

  //fonts
  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_700Bold,
    Sora_600SemiBold,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  }

  if (loading) return <ActivityIndicator size="large" color="red" />;

  if (!details) return <Text>No details Found</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: colors.backGround }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {/** Header */}
          <View className="absoulte top-0 left-0 right-0">
            <View className=" flex-row justify-between">
              <View className=" flex-row">
                <Image
                  source={require("@/assets/images/movie.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text
                  className="pt-4 font-sora_bold text-2xl  "
                  style={{ color: colors.secondaryText }}
                >
                  BingeMovies
                </Text>
              </View>
              <View className=" pt-4 flex-row gap-6">
                <Link href="/categories/saved" push asChild>
                  <Ionicons
                    name="person"
                    size={25}
                    style={{ color: colors.secondaryText }}
                  />
                </Link>
              </View>
            </View>
            <View className=" flex justify-end ">
              <TouchableOpacity
                onPress={toggleTheme}
                style={{ marginLeft: 367 }}
              >
                <Text
                  className=" font-sora text-xl "
                  style={{ fontWeight: "bold", color: colors.secondaryText }}
                >
                  {theme === "light" ? " Light" : " Dark "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={{ flex: 1, paddingLeft: 4 }}>
            {details.poster_path && (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w300${details.poster_path}`,
                }}
                style={{
                  width: 400,
                  height: 400,
                  marginTop: 10,
                  marginLeft: 1,
                  borderRadius: 10,
                }}
              />
            )}
            <View className="flex-row justify-evenly gap-1">
              <TouchableOpacity
                style={{
                  backgroundColor: colors.secondaryText,
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 10,
                  width: 195,
                }}
                onPress={() =>
                  addToWatchlist({
                    id,
                    title: details.title,
                    name: details.name,
                    poster_path: details.poster_path,
                    overview: details.overview,
                  })
                }
              >
                <Text
                  className=" font-poppins text-lg "
                  style={{
                    backgroundColor: colors.secondaryText,
                    color: colors.primaryText,
                    textAlign: "center",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.secondaryText,
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 10,
                  width: 195,
                }}
                onPress={() => {
                  if (watchLink) {
                    Linking.openURL(watchLink);
                  } else {
                    alert("No providers available in your region ");
                  }
                }}
              >
                <Text
                  className=" font-poppins text-lg "
                  style={{
                    backgroundColor: colors.secondaryText,
                    color: colors.primaryText,
                    textAlign: "center",
                  }}
                >
                  Watch
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 400 }}>
              <Text
                className=" font-sora_bold text-2xl "
                style={{ marginTop: 16, color: colors.secondaryText }}
              >
                {details.title || details.name}
              </Text>
              <Text
                className=" font-poppins text-lg "
                style={{ marginTop: 8, color: colors.secondaryText }}
              >
                {details.overview}
              </Text>
              <Text
                className=" font-sora_bold text-sm "
                style={{ marginTop: 8, color: colors.secondaryText }}
              >
                Release Date: {details.release_date || details.first_air_date}
              </Text>
              <Text
                className=" font-poppins text-sm "
                style={{ marginTop: 4, color: colors.secondaryText }}
              >
                Rating: {details.vote_average}{" "}
                <Ionicons name="star" size={20} color="#FFD700" /> (
                {details.vote_count} votes)
              </Text>
            </View>
          </ScrollView>
          {/** FOOTER */}
          <View
            className="absolute bottom-0 left-0 right-0 flex-row justify-around  h-28 items-center"
            style={{ backgroundColor: colors.backGround }}
          >
            <Link href="/landing-page" push asChild>
              <Ionicons
                name="home"
                size={20}
                className="-mt-10"
                style={{ color: colors.secondaryText }}
              />
            </Link>
            <Link href="/categories/movies" push asChild>
              <Ionicons
                name="play-circle"
                size={20}
                className="-mt-10"
                style={{ color: colors.secondaryText }}
              />
            </Link>
            <Link href="/categories/tv_series" push asChild>
              <Ionicons
                name="folder"
                size={20}
                className="-mt-10"
                style={{ color: colors.secondaryText }}
              />
            </Link>
            <Link href="/categories/saved" push asChild>
              <Ionicons
                name="bookmark"
                size={20}
                className="-mt-10"
                style={{ color: colors.secondaryText }}
              />
            </Link>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
