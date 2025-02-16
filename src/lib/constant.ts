import { Home, Trash, BookTemplate, Settings } from "lucide-react";

export const data = {

    navMain : [
        {
            title: 'Dashboard',
            icon: Home,
            link: '/dashboard',
        },
        {
            title: 'Projects',
            icon: BookTemplate,
            link: '/projects',
        },
        {
            title: 'Trash',
            icon: Trash,
            link: '/trash',
        },
        {
            title: 'Settings',
            icon: Settings,
            link: '/settings',
        },
    ]
}