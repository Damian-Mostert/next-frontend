import { NextResponse } from "next/server";

import sections from "@web/components/__load";

export function GET() {
  return NextResponse.json(
    Object.keys(sections).map((key) => {
      return {
        key,
        configuration: sections[key].configuration,
      };
    })
  );
}