import { Layout, Menu } from 'antd';
const { Header } = Layout;
import Link from 'next/link';
import styled from 'styled-components';
import { useFetchUser } from 'lib/user';

const StyledHeader = styled(Header)`
    ${({ theme }) => `
        background-color:${theme['header_color']};
        border-bottom:1px solid ${theme['header_color']};
        li a {
            font-size:${theme['font_size_md']};
        }
    `};
    display: flex;
    justify-content: space-between;
`;
const StyledMenu = styled(Menu)`
    line-height: 62px !important;
    border-bottom: none;
`;

const StyledBrand = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        .brand-name {
            visibility: hidden;
        }
    }
    .logo {
        width: 4em;
        margin-right: 1em;
    }
    .brand-name {
        ${({ theme }) => `
        h2{
            text-align: left;
            font-size:${theme['font_size_lg']};
        }
        p{
            font-size:${theme['font_size_sm']};
            line-height:0;
        }
        `}
    }
`;
export default function MainNavBar() {
    const { user, loading } = useFetchUser();

    return (
        <StyledHeader>
            <StyledBrand>
                <img className="logo" src="/logo.svg" alt="recipe brand" />
                <div className="brand-name">
                    <h2>The Next Chop</h2>
                    <p>A recipe discovery app powered by Next.js</p>
                </div>
            </StyledBrand>
            <StyledMenu mode="horizontal" theme="light">
                <Menu.Item key="home">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </Menu.Item>
                {user && !loading ? (
                    [
                        <Menu.Item key="my-recipes">
                            <Link href="/my-recipes">
                                <a>My Recipes</a>
                            </Link>
                        </Menu.Item>,
                        <Menu.Item key="favorites">
                            <Link href="/favorites">
                                <a>Favorites</a>
                            </Link>
                        </Menu.Item>,
                        <Menu.Item key="logout">
                            <Link href="/api/logout">
                                <a>Logout</a>
                            </Link>
                        </Menu.Item>,
                    ]
                ) : (
                    <Menu.Item key="login">
                        <Link href="/api/login">
                            <a>Login</a>
                        </Link>
                    </Menu.Item>
                )}
            </StyledMenu>
        </StyledHeader>
    );
}
