import { NextResponse } from "next/server";
import { messageService } from "@/services/message.service";

  export async function POST(req: Request, context: { params: { id: string } }) {
  const id = context.params.id;

  const { password } = await req.json().catch(() => ({}));
  const result = await messageService.readMessage(id, password);

  switch (result.status) {
    case "not-found":
      return new NextResponse("not-found", { status: 404 });

    case "requires-password":
      return new NextResponse("requires-password", { status: 401 });

    case "wrong-password":
      return new NextResponse("wrong-password", { status: 401 });

    case "success":
      return NextResponse.json({
        title: result.title,
        content: result.content,
      });
  }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const result = await messageService.readMessage(params.id);

  switch (result.status) {
    case "not-found":
      return new NextResponse("not-found", { status: 404 });

    case "requires-password":
      return new NextResponse("requires-password", { status: 401 });

    case "success":
      return NextResponse.json({
        title: result.title,
        content: result.content,
      });
  }
}
