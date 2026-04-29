import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');

  if (!fileUrl) {
    return NextResponse.json({ error: 'Paramètre url manquant' }, { status: 400 });
  }

  try {
    const response = await fetch(fileUrl, {
      headers: { Accept: 'application/pdf,*/*' },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Impossible de récupérer le fichier (${response.status})` },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/pdf';
    const disposition = response.headers.get('content-disposition') || 'inline';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': disposition,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du fichier' },
      { status: 500 }
    );
  }
}
