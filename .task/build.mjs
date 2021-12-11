import shelljs from "shelljs"

shelljs.rm("-rf", "dist")

shelljs.exec("tsc")

// Removing .js files generated on typings
shelljs.cd("dist/typings")
shelljs.exec('find . -type f -name "*.js" -exec rm -rf {} +')
