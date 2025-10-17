import {Editor} from "@/app/documents/[documentId]/editor";
import {EditorToolbar} from "@/app/documents/[documentId]/editor-toolbar";
import {Navbar} from "@/app/documents/[documentId]/navbar";

interface DocumentPropsInterface {
    params: Promise<{ documentId: string }>;
}

const DocumentDetailPage = async ({params}: DocumentPropsInterface) => {

    return (
        <div className="min-h-screen bg-[#FAFBFD]">
            <Navbar/>
            <EditorToolbar/>
            <Editor/>
        </div>
    )
}
export default DocumentDetailPage;