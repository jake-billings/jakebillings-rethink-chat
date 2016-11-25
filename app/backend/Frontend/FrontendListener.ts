export interface FrontendListener {
    onConnect: (data: any) => void;
    onCreate: (data: any) => void;
    onUpdate: (data: any) => void;
    onDelete: (data: any) => void;
}