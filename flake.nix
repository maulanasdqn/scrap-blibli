{
  description = "Automation";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShell = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
        nodejs-16_x
        nodePackages.yarn
        nodePackages.typescript
        ];
        shellHook = with pkgs; ''
        export CHROMIUM_PATH=${chromium}
        '';
      };
    });
}
