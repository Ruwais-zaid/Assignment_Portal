const authorize = (requiredPermissions) => {
    return (req, res, next) => {
        const user = req.user; // Extract user from middleware
        const userPermissions = roles[user.role] || [];

        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
};
