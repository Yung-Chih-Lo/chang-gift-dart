import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: '密碼不能為空' },
        { status: 400 }
      );
    }

    const correctPassword = process.env.PASSWORD;

    if (!correctPassword) {
      console.error('PASSWORD environment variable is not set');
      return NextResponse.json(
        { error: '伺服器配置錯誤' },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      return NextResponse.json({
        success: true,
        message: '密碼驗證成功'
      });
    } else {
      return NextResponse.json(
        { error: '密碼錯誤' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: '驗證失敗，請稍後再試' },
      { status: 500 }
    );
  }
}
