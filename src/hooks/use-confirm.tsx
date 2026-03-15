"use client";

import { useCallback, useState } from "react";
import TriangleWarning from "@/app/assets/icons/triangle-warning";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type ConfirmOptions = {
	title?: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
	variant?: "default" | "destructive";
};

type Resolver = (value: boolean) => void;

const defaultOptions: Required<ConfirmOptions> = {
	title: "Are you sure ?",
	message: "This action cannot be undone.",
	confirmText: "Confirm",
	cancelText: "Cancel",
	variant: "default",
};

const WarningBadge = ({ iconSize = "size-6" }: { iconSize?: string }) => {
	return (
		<div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-destructive/22 via-orange-500/18 to-amber-500/22 ring-1 ring-destructive/25 shadow-[0_6px_18px_-8px_rgba(239,68,68,0.45)]">
			<span className="absolute inset-1.25 rounded-full bg-background/60" />
			<TriangleWarning className={`${iconSize} text-destructive relative z-10`} />
		</div>
	);
};

export const useConfirm = (initialOptions?: ConfirmOptions) => {
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);
	const [resolver, setResolver] = useState<Resolver | null>(null);
	const [options, setOptions] = useState<Required<ConfirmOptions>>({
		...defaultOptions,
		...initialOptions,
	});

	const close = useCallback((value: boolean) => {
		setOpen(false);
		resolver?.(value);
		setResolver(null);
	}, [resolver]);

	const confirm = useCallback((nextOptions?: ConfirmOptions) => {
		setOptions({
			...defaultOptions,
			...initialOptions,
			...nextOptions,
		});

		setOpen(true);

		return new Promise<boolean>((resolve) => {
			setResolver(() => resolve);
		});
	}, [initialOptions]);

	const ConfirmDialog = () => {
		if(isMobile){
			return (
				<Drawer open={open} onOpenChange={(nextOpen) => !nextOpen && close(false)}>
					<DrawerContent className="border-destructive/20 rounded-t-2xl">
						<DrawerHeader className="gap-4 px-5 pt-6 text-left">
							<div className="flex items-center gap-3">
								<WarningBadge iconSize="size-5" />
								<DrawerTitle className="font-HG text-lg leading-tight tracking-wide">
									{options.title}
								</DrawerTitle>
							</div>
							<DrawerDescription className="text-left text-sm leading-relaxed text-muted-foreground/95">
								{options.message}
							</DrawerDescription>
						</DrawerHeader>

						<DrawerFooter className="border-t border-border/60 px-5 pt-4 pb-5">
							<Button
								className="font-HG"
								variant={options.variant === "destructive" ? "destructive" : "default"}
								onClick={() => close(true)}>
								{options.confirmText}
							</Button>
							<Button
								className="font-HG border-border/80 bg-background hover:bg-accent/60"
								variant="outline"
								onClick={() => close(false)}>
								{options.cancelText}
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			);
		}

		return (
			<Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && close(false)}>
				<DialogContent className="border-destructive/20 sm:max-w-115">
					<DialogHeader className="gap-3 px-5">
						<div className="mx-auto sm:mx-0">
							<WarningBadge />
						</div>
						<DialogTitle className="font-HG text-left text-lg tracking-wide -mb-2">{options.title}</DialogTitle>
						<DialogDescription className="text-left text-sm leading-relaxed">
							{options.message}
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="px-5 pt-1 pb-0 sm:justify-end">
						<Button className="border-none outline-0" variant="default" onClick={() => close(false)}>
							{options.cancelText}
						</Button>
						<Button
							className=""
							variant={options.variant === "destructive" ? "destructive" : "default"}
							onClick={() => close(true)}>
							{options.confirmText}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	};

	return [ConfirmDialog, confirm] as const;
};
