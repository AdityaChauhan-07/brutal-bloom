const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative">
          <h1 className="font-display text-8xl md:text-9xl font-black text-primary mb-8">
            BRUTAL
          </h1>
          <div className="w-32 h-1 bg-accent mx-auto animate-pulse"></div>
        </div>
        <p className="font-mono text-xl uppercase tracking-wider mt-8 text-muted-foreground">
          Loading Experience...
        </p>
      </div>
    </div>
  );
};

export default Loader;