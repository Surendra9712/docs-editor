import {Editor} from "@/app/documents/[documentId]/editor";
import {EditorToolbar} from "@/app/documents/[documentId]/editor-toolbar";

interface DocumentPropsInterface {
    params: Promise<{ documentId: string }>;
}

const DocumentDetailPage = async ({params}: DocumentPropsInterface) => {

    return (
        <div className="min-h-screen bg-[#FAFBFD]">
            <EditorToolbar/>
            <Editor/>
        </div>
    )
}
export default DocumentDetailPage;