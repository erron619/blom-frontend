module.exports = {
    mode   : "jit",
    content: [
        "./pages/**/*.ejs",
        "./components/**/*.ejs"
    ],
    safelist: [
    ],
    darkMode: "class",
    theme  : {
        colors: { 
            white: "#FFFFFF",
            gray: {
                50 : "#FAFAFA",
                100: "#F4F4F5",
                200: "#E4E4E7",
                400: "#A1A1AA",
                600: "#52525B",
                800: "#27272A",
            },
            green: {
                50 : "#F0FDF4",
                100: "#D1FAE5",
                200: "#A7F3D0",
                300: "#6EE7B7",
                400: "#34D399",
            },
            red: {
                500: "#EF4444",
                // 600: "#DC2626",
            },
            blue: {
                400: "#38BDF8",
            },
            other: {
                goftino : "#6366F1",
                telegram: "#3B82F6",
                eeta    : "#F59E0B",
            },

            transparent: "transparent",
            inherite   : "inherite",
        },
        fontFamily: {
            IranSansX: ["IranSansX", "sans-serif"],
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px"
        },
        extend: {
            container: {
                center: true,
                padding: "1rem"
            },
        }
    },
}