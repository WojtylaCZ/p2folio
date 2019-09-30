import React from "react";

import DragAndDropFilesInput from "./DragAndDropFilesInput";
import UploadFilesInput from "./UploadFilesInput";

export type RawFileUploadedProps = {
  onRawFileUploaded: (rawFile: ArrayBuffer, filename: string) => void;
};

type State = {
  platformDataArray: (any)[];
};

class App extends React.Component<{}, State> {
  public state = { platformDataArray: [] };

  public handleUploadedRawFile(rawFile: ArrayBuffer, filename: string) {
    this.setState(prevState => ({
      platformDataArray: [...prevState.platformDataArray, rawFile]
    }));
  }

  public render() {
    return (
      <div>
        <UploadFilesInput
          onRawFileUploaded={(rawfile, filename) =>
            this.handleUploadedRawFile(rawfile, filename)
          }
        />
        <DragAndDropFilesInput
          onRawFileUploaded={(rawfile, filename) =>
            this.handleUploadedRawFile(rawfile, filename)
          }
        />
        Account statements:{" "}
        {this.state.platformDataArray
          ? this.state.platformDataArray.length
          : "0"}
        {/* Portfolio statistics */}
      </div>
    );
  }
}

export default App;
