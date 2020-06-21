
!macro customUnInstall
  !system "echo '' > ${BUILD_RESOURCES_DIR}\customInstall"
  !system "echo '' > ${PROJECT_DIR}\customInstall"
  ExecWait '"\Program Files\remoteit-bin\remoteit.exe" version > ${PROJECT_DIR}\customVersion'
!macroend