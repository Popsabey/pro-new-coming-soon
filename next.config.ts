module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://script.google.com/macros/s/.../exec/:path*",
      },
    ];
  },
};
