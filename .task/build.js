import shelljs from "shelljs"

shelljs.rm("-rf", "dist")

shelljs.exec("tsc")
