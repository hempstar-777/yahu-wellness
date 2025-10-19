import logo from "@/assets/logo.png";

const YahuahBanner = () => {
  return (
    <div className="w-full py-6 flex flex-col items-center justify-center gap-4 border-b border-border/30 bg-gradient-to-r from-background via-accent/5 to-background">
      <img src={logo} alt="Logo" className="h-16 w-auto" />
      <h1 className="text-6xl md:text-7xl font-bold text-[#FFD700] paleo-hebrew-text">
        𐤉𐤄𐤅𐤄
      </h1>
    </div>
  );
};

export default YahuahBanner;
